<script>
    import Logo from "$lib/components/Logo.svelte";
	import AuthForm from "$lib/components/auth/AuthForm.svelte";
</script>

<div class="bg-hero-pattern bg-cover h-screen">

    <!-- Sidebar -->
    <div class="fixed h-full w-[580px] right-0 bg-white">
        <div class="flex flex-col h-full justify-center items-center">

            <div class="flex h-[300px] justify-center items-center">
                <Logo className="h-20 w-full" large />
            </div>

            <div class="flex-1 w-[340px]">
               <AuthForm />
            </div>

        </div>
    </div>

</div>