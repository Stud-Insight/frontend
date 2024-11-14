<script lang="ts">
    import Logo from '$lib/components/Logo.svelte';

    let { children } = $props();
</script>


<div class="bg-hero-pattern bg-cover h-screen">

    <!-- Sidebar -->
    <div class="fixed h-full w-[580px] right-0 bg-white">
        <div class="flex flex-col h-full items-center">

            <div class="flex w-full h-[300px] justify-center items-center">
                <Logo className="h-20 w-full" large />
            </div>

            {@render children()}

        </div>
    </div>

</div>