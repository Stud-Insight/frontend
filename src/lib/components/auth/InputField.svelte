<script lang="ts">
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

    let iconStyle: string = iconColor !== 'inherit' && `color: ${iconColor};` || '';
</script>

<div class="mb-6">
    <label class="mb-1 flex flex-row space-x-2 items-center text-smp font-bold text-gray" for="input-field">
        {#if icon}
            <div style={iconStyle}>
                <Icon icon={icon} font-size={iconSize} />
            </div>
        {/if}
        <span>{label}</span>
    </label>
    <input
        class="mb-3 w-full bg-light-gray appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow drop-shadow-sm focus:outline-none"
        id="input-field"
        type={type}
        placeholder={placeholder}
    />
</div>
