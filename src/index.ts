import { defineInterface } from '@directus/extensions-sdk';
import RokkaInterface from './rokka-interface.vue';

export default defineInterface({
	id: 'extension-rokka',
	name: 'Rokka Hash',
	description: 'Rokka hash interface for files',
	icon: 'image',
	component: RokkaInterface,
	hideLabel: true,
	hideLoader: true,
	types: ['string'],
	group: 'standard',
	options: null,
});
