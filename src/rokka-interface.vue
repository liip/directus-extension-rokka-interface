<template>
	<div>
		<v-input :model-value="value" @update:model-value="onChange">
			<template #prepend>
				<v-icon name="key" />
			</template>
			<template #append>
				<template v-if="value">
					<v-icon
						v-tooltip="'Delete form rokka'"
						name="delete"
						class="is-action delete"
						@click="deleteFromRokka"
					/>
				</template>
				<template v-else>
					<v-icon
						v-tooltip="'Upload to rokka'"
						name="publish"
						class="is-action upload"
						@click="uploadToRokka"
					/>
				</template>
			</template>
		</v-input>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, nextTick, watch, computed, PropType } from 'vue';
import { useApi } from '@directus/extensions-sdk';
import { RokkaClientDirectus } from 'rokka-client-directus';

export default defineComponent({
	props: {
		primaryKey: {
			type: [Number, String],
			required: true,
		},
		field: {
			type: String,
			default: null,
			required: true,
		},
		value: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		length: {
			type: Number,
			default: null,
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
		update: {
			type: Array as PropType<string[]>,
			default: () => ['create'],
		},
		collection: {
			type: String,
			required: true,
		},
	},
	emits: ['input'],
	setup(props, { emit, attrs }) {
		const api = useApi();
		const rokkaClient = new RokkaClientDirectus();
		const values = inject('values', ref<Record<string, any>>({}));

		return {
			onChange,
			deleteFromRokka,
			uploadToRokka,
		};

		function onChange(value: string) {
			if (props.disabled) return;
			if (props.value === value) return;

			// Emit exact value.
			emit('input', value || '');
		}
		function deleteFromRokka() {
			console.log('deleteing', props.value)

		}
		function uploadToRokka() {
			console.log(values.value);
			/*const storage = getStorage(record.payload.storage);

			const { exists } = await storage.exists(record.payload.filename_disk);

			if (!exists) {
				throw new RokkaException(
					`Image ${record.payload.filename_disk} does not exist on storage`,
					500,
					'ROKKA_FILE_MISSING'
				);
			}

			const stream = storage.getStream(record.payload.filename_disk);

			const rokkaHash = await this.rokkaClient.upload(record.payload.filename_download, stream);*/
			console.log(values)
			//const rokkaHash = rokkaClient.upload(props.primaryKey, '','','')
			//emit('input', rokkaHash);
			console.log('uploadToRokka', props.primaryKey)
		}
	},
});
</script>

<style lang="scss" scoped>
.is-action {
	cursor: pointer;
}
.upload:hover {
	--v-icon-color: var(--primary);
}
.delete:hover {
	--v-icon-color: var(--danger);
}
</style>
