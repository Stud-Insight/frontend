<script>
    import { page } from "$app/stores";
    import AccountValidationPage from "$pages/auth/AccountValidationPage.svelte";
    const validationToken = $page.data.validationToken;
    
</script>


<AccountValidationPage validationToken={validationToken} />