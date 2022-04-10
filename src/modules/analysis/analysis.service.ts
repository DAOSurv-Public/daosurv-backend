import { Injectable, Logger } from '@nestjs/common';
import { TweetService } from '../tweet/tweet.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CovalenthqService } from '../covalenthq/covalenthq.service';
import { FireStoreService } from '../firestore/firestore.service';
import { PROTOCOLS } from 'src/configs/address.protocols';
import { BigNumber, formatFixed, parseFixed } from '@ethersproject/bignumber';
import * as numeral from 'numeral';

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly tweetService: TweetService,
    private readonly httpService: HttpService,
    private readonly covalenthqService: CovalenthqService,
    private readonly fireStoreService: FireStoreService,
  ) {}

  async queryProposal(dao): Promise<void> {
    const address: string = PROTOCOLS[dao].proposal;
    const db_proposals = await this.fireStoreService.getData(dao, 'proposal');
    const proposal_ids = {};
    const query = `{\n  proposals(where: {governor: "${address}"}) {\n id\n governor\n forVotes\n againstVotes\n abstainVotes \nexecuted\n }\n}\n`;
    const response = await firstValueFrom(
      this.httpService.post(this.configService.get<string>('theGraphUrl'), {
        query,
        variables: null,
      }),
    );

    response.data.data.proposals.forEach((item) => {
      proposal_ids[item.id] = item.id;

      try {
        if (!db_proposals[item.id]) {
          const msg = `[${dao} ${item.id}] has been proposed! What do you think? Vote now!\n1.)Yes, pleasel\n2.)Nono`;
          this.logger.debug(msg);
          // this.tweetService.tweet(msg)
        }
      } catch (e) {
        this.logger.debug(e);
      }
    });
    this.fireStoreService.storeData(dao, 'proposal', proposal_ids);
  }

  async queryBalance(dao): Promise<void> {
    const address = PROTOCOLS[dao].treasury;
    const res = await this.covalenthqService.getTokenBalancesForAddress(
      address,
    );
    const db_balance = await this.fireStoreService.getData(dao, 'balance');
    const percent_threshold = 0;
    const new_balance = {};

    res.data.items.forEach((item) => {
      new_balance[item.contract_address] = item.balance;
      try {
        if (item.type == 'dust') {
          return;
        }
        const denominator = 10 ** parseInt(item.contract_decimals);
        const balance = parseFloat(item.balance);
        const old_balance = parseFloat(db_balance[item.contract_address]);
        if (old_balance) {
          const diff_usd =
            (balance - old_balance) * parseFloat(item.quote_rate);
          const diff_percent = (balance - old_balance) / old_balance;
          if (diff_percent >= percent_threshold) {
            const msg = `${(balance - old_balance) / denominator} #${
              item.contract_ticker_symbol
            } (${diff_usd} USD)\n has been transferred to #${dao}`;
            this.logger.debug(msg);
            // this.tweetService.tweet(msg)
          } else if (diff_percent < -percent_threshold) {
            const msg = `${(old_balance - balance) / denominator} #${
              item.contract_ticker_symbol
            } (${-diff_usd} USD)\n has been transferred to #${dao}`;
            this.logger.debug(msg);
            // this.tweetService.tweet(msg)
          }
        }
      } catch (e) {
        this.logger.debug(e);
      }
    });
    this.fireStoreService.storeData(dao, 'balance', new_balance);
  }

  async queryTransaction(dao) {
    const address = PROTOCOLS[dao].treasury;
    const res = await this.covalenthqService.getTokenBalancesForAddress(
      address,
    );

    const db_alerts = await this.fireStoreService.getData(dao, 'alerts');

    const db_block_synced = await this.fireStoreService.getData(
      dao,
      'block_synced',
    );

    const endingBlock = await this.covalenthqService.getBlockLatest();

    if (!db_alerts) {
      await this.fireStoreService.storeData(dao, 'alerts', { list: [] });
    }
    if (!db_block_synced) {
      await this.fireStoreService.storeData(dao, 'block_synced', { block: 0 });
    }

    if (db_alerts && db_block_synced) {
      this.logger.debug(`BLOCK -  synced : ${db_block_synced.block}`);
      this.logger.debug(`BLOCK -  Latest : ${endingBlock}`);

      for (const token of res.data.items) {
        try {
          const transfers =
            await this.covalenthqService.getERC20TokenTransfersForAddress(
              address,
              token.contract_address,
              endingBlock,
              db_block_synced.block ? db_block_synced.block : undefined,
            );

          for (const tx of transfers.data.items) {
            for (const transfer of tx.transfers) {
              const msg = {
                from_address: transfer.from_address,
                from_address_label: transfer.from_address_label,
                to_address: transfer.to_address,
                to_address_label: transfer.to_address_label,
                tx_hash: transfer.tx_hash,
                logo_url: transfer.logo_url,
                transfer_type: transfer.transfer_type,
                contract_decimals: transfer.contract_decimals,
                contract_name: transfer.contract_name,
                contract_ticker_symbol: transfer.contract_ticker_symbol,
                contract_address: transfer.contract_address,
                delta: transfer.delta,
                quote_rate: transfer.quote_rate,
              };
              // this.logger.debug('msg obj', msg);

              const value = formatFixed(
                transfer.delta,
                transfer.contract_decimals,
              );

              const price = transfer?.quote_rate
                ? +value * parseFloat(transfer.quote_rate)
                : 0;

              if (price > 10000) {
                //insert msg for interface
                db_alerts.list.push(msg);
                await this.fireStoreService.storeData(dao, 'alerts', db_alerts);
                const isSender =
                  address.toLowerCase() == transfer.from_address.toLowerCase();
                const isRecipient =
                  address.toLowerCase() == transfer.to_address.toLowerCase();

                const from = isSender
                  ? `#${dao} (${PROTOCOLS[dao].tw_url})`
                  : transfer.from_address_label || transfer.from_address;

                const to = isRecipient
                  ? `#${dao} (${PROTOCOLS[dao].tw_url})`
                  : transfer.to_address_label || transfer.to_address;

                const etherscan = `https://etherscan.io/tx/${transfer.tx_hash}`;

                const tweet = `🚨🚨🚨🚨 ALERT 🚨🚨🚨🚨\n${value} #${
                  transfer.contract_ticker_symbol
                } ${
                  price ? '(' + numeral(price).format('0,0.00') + ' USD)' : ''
                } \ntransferred from ${from} \nto ${to}\n[${etherscan}]`;

                // this.logger.debug(tweet);

                await this.tweetService.tweet(tweet);

                await this.fireStoreService.storeData(dao, 'block_synced', {
                  block: endingBlock,
                });
              }
            }
          }
        } catch (error) {
          this.logger.error(JSON.stringify(error));
        }
      }
    }
  }
  }
}
