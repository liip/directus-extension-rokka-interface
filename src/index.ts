import { defineInterface } from '@directus/extensions-sdk';
import RokkaInterface from './interface.vue';

export default defineInterface({
	id: 'extension-rokka',
	name: 'Slug',
	description: 'Rokka interface for files',
	icon: 'image',
	component: RokkaInterface,
	types: ['string'],
	group: 'standard',
	options: null,
});
