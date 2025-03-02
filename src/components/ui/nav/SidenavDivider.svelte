<script lang="ts">
    interface SidenavDividerProps {
        className: string;
    }

    let { className }: SidenavDividerProps = $props();
</script>

<div class="border-b-2 my-4 border-light-gray {className}">

</div>