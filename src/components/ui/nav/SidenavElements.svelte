<script lang="ts">
    interface SidenavElementsProps {
        children: any;
    }

    let { children }: SidenavElementsProps = $props();
</script>

<div class="flex flex-col space-y-2 w-full px-4">
    {@render children()}
</div>