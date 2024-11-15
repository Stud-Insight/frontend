<script lang="ts">
    import Logo from '$lib/components/Logo.svelte';

    let { children } = $props();
</script>


<div class="bg-hero-pattern bg-cover h-screen">

    <!-- Sidebar -->
    <div class="fixed h-full w-1/3 right-0 bg-white">
        <div class="flex flex-col h-full justify-center items-center w-full">

            <div class="flex w-full mb-32 justify-center items-center">
                <Logo className="h-28 px-12" large />
            </div>

            <div class="w-[60%] py-10">
                {@render children()}
            </div>

        </div>
    </div>

</div>