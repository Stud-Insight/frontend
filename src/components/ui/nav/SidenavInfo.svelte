<script lang="ts">
    import Icon from "@iconify/svelte";

    interface SidenavInfoProps {
        children: any;
        title: string;
        icon: string;
        iconSize?: number;
        className?: string;
    }

    let { children, title, icon, iconSize = 16, className = "" }: SidenavInfoProps = $props();
</script>

<div class="text-red p-2 bg-red bg-opacity-20 border-red border-2 rounded-lg {className}">
    <div class="flex flex-row items-center space-x-2">
        <Icon icon={icon} font-size={iconSize} />
        <h2 class="font-bold">{title}</h2>
    </div>
    {@render children()}
</div>