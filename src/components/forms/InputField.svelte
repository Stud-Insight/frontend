<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '@iconify/svelte';
    import colorPalette from '$lib/utils/colorPalette';
    import type { error } from '@sveltejs/kit';

    interface InputFieldProps {
        id?: string;
        value: string;
        label?: string;
        type?: string;
        placeholder?: string;
        icon?: string;
        iconSize?: number;
        iconColor?: string;
        fieldError?: boolean;
    }

    let {
        id = 'input-field-' + crypto.getRandomValues(new Uint32Array(1)),
        value = $bindable(),
        label,
        type = 'text',
        placeholder,
        icon,
        iconSize = 20,
        iconColor = 'inherit',
        fieldError = false
    }: InputFieldProps = $props();
    
    let iconStyle: string = iconColor !== 'inherit' ? `color: ${iconColor};` : '';
    let showPassword: boolean = $state(false);
    let inputType = $derived(type === 'password' && showPassword ? 'text' : type);
</script>

<div class="{fieldError ? 'text-red' : 'text-gray'}">
    {#if label}
        <label class="text-smp mb-1 flex flex-row items-center space-x-2 font-bold" for={id}>
            {#if icon}
                <div style={iconStyle}>
                    <Icon {icon} font-size={iconSize} />
                </div>
            {/if}
            <span>{label}</span>
        </label>
    {/if}

    <div class="relative w-full">
        <input
            bind:value
            class="bg-light-gray text-dark-gray w-full appearance-none {!!fieldError && 'border-red border-2'} rounded px-3 py-2 leading-tight shadow drop-shadow-sm focus:outline-none placeholder:italic placeholder:text-gray"
            id={id}
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