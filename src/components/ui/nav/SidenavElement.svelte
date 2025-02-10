<script lang="ts">
    import colorPalette from "$utils/colorPalette";
    import Icon from "@iconify/svelte";

    interface SidenavElementProps {
        icon: string;
        name: string;
        href: string;
        fontSize?: number;
    }

    let { icon, name, href, fontSize = 24 }: SidenavElementProps = $props();
</script>

<a {href} class="flex flex-row items-center space-x-4 rounded-xl px-4 py-2 transition hover:bg-light-gray select-none">
    <Icon icon={icon} font-size={fontSize} color={colorPalette.gray} />
    <span class="text-lg">{name}</span>   
</a>