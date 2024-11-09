<script>
    import Logo from "$lib/components/Logo.svelte";
	import AuthForm from "$lib/components/auth/AuthForm.svelte";
</script>

<div class="bg-hero-pattern bg-cover h-screen">

    <!-- Sidebar -->
    <div class="fixed h-full w-[30%] right-0 bg-white">
        <div class="flex flex-col justify-center items-center">
            <Logo className="h-20" large />

            <div class="w-[300px]">
                <AuthForm />
            </div>
        </div>
    </div>

</div>