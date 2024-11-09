<script lang="ts">
    import colorPalette from '$lib/utils/colorPalette';
    import Icon from '@iconify/svelte';

    interface InputFieldProps {
        label?: string;
        type?: string;
        placeholder?: string;
        icon?: string;
        iconSize?: number;
        iconColor?: string;
    }

    let {
        label = 'Label',
        type = 'text',
        placeholder,
        icon,
        iconSize = 20,
        iconColor = 'inherit'
    }: InputFieldProps = $props();

    let iconStyle: string = iconColor !== 'inherit' ? `color: ${iconColor};` : '';
    let showPassword: boolean = $state(false);
    let inputType = $derived(type === 'password' && showPassword ? 'text' : type);
</script>

<div class="text-gray mb-6">
    <label class="text-smp mb-1 flex flex-row items-center space-x-2 font-bold" for="input-field">
        {#if icon}
            <div style={iconStyle}>
                <Icon {icon} font-size={iconSize} />
            </div>
        {/if}
        <span>{label}</span>
    </label>

    <div class="relative w-full">
        <input
            class="bg-light-gray text-dark-gray w-full appearance-none rounded px-3 py-2 leading-tight shadow drop-shadow-sm focus:outline-none"
            id="input-field"
            type={inputType}
            {placeholder}
        />

        {#if type === 'password'}
            <button
                type="button"
                class="text-dark-gray absolute inset-y-0 right-3 flex items-center"
                onclick={() => (showPassword = !showPassword)}
                aria-label="Toggle password visibility"
            >
                <Icon
                    icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                    font-size={19}
                    color={colorPalette.gray}
                />
            </button>
        {/if}
    </div>
</div>

<style>
    .relative {
        position: relative;
    }
    .absolute {
        position: absolute;
    }
</style>
