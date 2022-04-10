import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CovalenthqService {
  private readonly logger = new Logger(CovalenthqService.name);
  covalenthqURL = 'https://api.covalenthq.com/';
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getTokenBalancesForAddress(address: string, chainId = 1) {
    const url = `${this.covalenthqURL}v1/${chainId}/address/${address}/balances_v2/`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: { key: this.configService.get('covalenthq_key') },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('GetTokenBalancesForAddress', JSON.stringify(error));
    }
  }

  async getERC20TokenTransfersForAddress(
    address: string,
    contractAddress: string,
    endingBlock?: number,
    startingBlock?: number,
    pageNumber?: number,
    pageSize?: number,
  ) {
    try {
      const url = `${this.covalenthqURL}v1/1/address/${address}/transfers_v2/`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            'contract-address': contractAddress,
            'page-number': pageNumber,
            'page-size': pageSize,
            'starting-block': startingBlock,
            'ending-block': endingBlock,
            key: this.configService.get('covalenthq_key'),
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        'GetERC20TokenTransfersForAddress',
        JSON.stringify(error),
      );
    }
  }

  async getSpotPrices(
    tickers?: string,
    pageNumber?: number,
    pageSize?: number,
  ) {
    try {
      const url = `${this.covalenthqURL}v1/pricing/tickers/`;

      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            tickers,
            'page-number': pageNumber,
            'page-size': pageSize,
            key: this.configService.get('covalenthq_key'),
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('GetSpotPrices', JSON.stringify(error));
    }
  }

  async getBlockLatest() {
    const url = `${this.covalenthqURL}v1/1/block_v2/latest/`;

    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          key: this.configService.get('covalenthq_key'),
        },
      }),
    );

    return response.data.data.items[0].height;
  }
}
