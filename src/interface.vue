<template>
	<v-input
		:model-value="value"
		@update:model-value="onChange"
	>
		<template #prepend>
			<v-icon name="key" />
		</template>
	</v-input>
</template>

<script lang="ts">
import { defineComponent, ref, inject, nextTick, watch, computed, PropType } from 'vue';
import { useApi } from '@directus/extensions-sdk';

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
		iconLeft: {
			type: String,
			default: null,
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
		/*const api = useApi();
		const { t } = useI18n();
		const values = inject('values', ref<Record<string, any>>({}));
		const savedParentId = computed<number>(() => values.value.parent);
		const parentSlugs = ref<string[]>([]);
		const parentsLoading = ref(false);
		const isEditing = ref<boolean>(props.autofocus);
		const isTouched = ref<boolean>(false);
		const cachedValueBeforeEdit = ref<string>(props.value);
		const trim = ref<boolean>(true);
		const renderedPrefix = computed<string>(() => render(props.prefix || '', values.value));
		const renderedSuffix = computed<string>(() => render(props.suffix || '', values.value));
		const renderedParentSlugs = computed<string>(() =>
			parentSlugs.value.length > 0 ? `${parentSlugs.value.join('/')}/` : ''
		);
		const renderedParentSlugsShort = computed<string>(() =>
			renderedParentSlugs.value.length > MAX_RENDERED_PARENT_SLUGS_LENGTH
				? `...${renderedParentSlugs.value.slice(-MAX_RENDERED_PARENT_SLUGS_LENGTH)}`
				: renderedParentSlugs.value
		);
		const presentedLink = computed<string>(
			() =>
				`${renderedPrefix.value}${renderedParentSlugs.value}${
					props.value || props.placeholder || attrs['field-data']?.meta.field
				}${renderedSuffix.value}`
		);
		const isDiffer = computed<boolean>(() => {
			const transformed = transform(render(props.template, values.value));
			if (transformed === (props.value || '')) return false;
			return (transformed !== (props.value || '').replace(/-\d+$/, ''));
		});

		if (savedParentId.value) {
			parentsLoading.value = true;
			getParentSlugs(savedParentId.value).then(function (p) {
				parentSlugs.value = p;
				parentsLoading.value = false;
			});
		}

		watch(values, (newValues: Record<string, any>, oldValues: Record<string, any>) => {
			// Remove slugs if parent was removed
			if (oldValues[props.parent] && !newValues[props.parent]) {
				parentSlugs.value = [];
			}
			// Refresh parent slugs if parent changed
			if (newValues[props.parent] && newValues[props.parent] !== oldValues[props.parent]) {
				// newValues[props.parent] contain the parent id if a new parent was selected or a proxy object when the parent was edited
				const parentId: number =
					typeof newValues[props.parent] === 'number' ? newValues[props.parent] : newValues[props.parent].id;
				if (parentId) {
					parentsLoading.value = true;
					getParentSlugs(parentId).then(function (p) {
						parentSlugs.value = p;
						parentsLoading.value = false;
					});
				}
			}

			// Reject when manually edited.
			if (isEditing.value || isTouched.value) return;

			// According to the update policy.
			if (!(props.primaryKey !== '+' ? props.update.includes('update') : props.update.includes('create'))) return;

			// Avoid self update.
			if (newValues[props.field] && (newValues[props.field] || '') !== (props.value || '')) return;

			resetToTemplate(newValues);
		});*/

		return {
			onChange,
		};

		function onChange(value: string) {
			if (props.disabled) return;
			if (props.value === value) return;

			// Emit exact value.
			emit('input', value || '');
		}
	},
});
</script>
