import rokka from 'rokka';
import { Logger } from 'pino';
import { RokkaApi } from 'rokka/dist/apis';
import { RokkaException } from '../exceptions';
import { ResizeMode, StackConfig } from '../types';
import { getRokkaConfiguration, RokkaConfiguration } from '../utils/environment';

const SUPPORTED_IMAGE_TYPES: string[] = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/svg+xml',
	'image/tiff',
	'image/bmp',
	'application/pdf',
];

export class RokkaClient {
	rokkaApi: RokkaApi;
	rokkaConfiguration: RokkaConfiguration;

	constructor(private logger: Logger) {
		this.rokkaConfiguration = getRokkaConfiguration();

		this.rokkaApi = rokka({
			apiKey: this.rokkaConfiguration.apiKey,
		});
	}

	public isSupported(mimeType: string): boolean {
		return SUPPORTED_IMAGE_TYPES.includes(mimeType) && this.isMimeTypeActivated(mimeType);
	}

	private isMimeTypeActivated(mimeType: string): boolean {
		return this.rokkaConfiguration.activatedMimeTypes
			? this.rokkaConfiguration.activatedMimeTypes.includes(mimeType)
			: true;
	}

	public async upload(fileName: string, fileStream: any) {
		const response = await this.rokkaApi.sourceimages.create(
			this.rokkaConfiguration.organisation,
			fileName,
			fileStream
		);

		return response.body.items && response.body.items.length > 0 ? response.body.items[0]?.hash : null;
	}

	public async delete(hash: string) {
		const response = await this.rokkaApi.sourceimages.delete(this.rokkaConfiguration.organisation, hash);
		if (response.statusCode !== 204 && response.statusCode !== 404) {
			throw new RokkaException(response.message ?? 'UNKNOWN MESSAGE', 500, 'ROKKA_IMAGE_NOT_DELETED');
		}
	}
}
