<script lang="ts">
    import WorkIllustration from '$components/svg/WorkIllustration.svelte';
    import Sidenav from '$components/ui/nav/Sidenav.svelte';
    import type { User } from '$lib/interfaces/User';
    import CreateUserPage from '$pages/admin/CreateUserPage.svelte';
    import Icon from '@iconify/svelte';
    import { Button, Modal} from 'flowbite-svelte';

    interface DashboardPageProps {
        user: User;
    }

    let { user }: DashboardPageProps = $props();
    let createUserModal = $state(false);

</script>

<div class="h-screen flex flex-row">
    
    <Sidenav {user} />

    <!-- Dashboard Container -->
    <div class="flex flex-col space-y-6 w-full h-full p-12">

        <!-- Welcome Banner -->
        <div class="flex justify-between items-center w-full h-48 px-16 bg-gradient-to-r from-[#2196f3] to-blue rounded-xl">
            <div class="text-white">
                <h1 class="text-3xl font-bold mb-4">Bonjour, {user.firstName}.</h1>
                <p class="text-lg">Bienvenue sur votre tableau de bord où vous pouvez consulter vos différentes expériences.</p>
                <p class="text-lg flex items-center">Vous avez 0 <span><Icon icon="line-md:bell-loop" font-size="20" /></span> nouvelles notifications.</p>
                <p></p>
            </div>
            <WorkIllustration width={200} />
        </div>

        <div class="flex flex-row space-x-6 w-full h-full">
            <!-- Gestion/Affichage des TERs -->
            <div class="h-full w-full bg-light-gray rounded-xl content-center">
            </div>

            <!-- Gestion/Affichage des TERs -->
            <div class="h-full w-full bg-light-gray rounded-xl">
                <Button class="bg-cyan" onclick={() => (createUserModal = true)}>Créer un utilisateur</Button>
                <Modal bind:open={createUserModal} size="xs" autoclose={false} outsideclose class="w-full">
                    <CreateUserPage/>
                </Modal>
            </div>
        </div>

    </div>

</div>
