<script lang="ts">
    import type { User } from "$lib/interfaces/User";
    
    import { logout, isAdmin } from "$utils/authUtil";
    import Logo from "../Logo.svelte";
    import SidenavAccount from "./SidenavAccount.svelte";
    import SidenavDivider from "./SidenavDivider.svelte";
    import SidenavElement from "./SidenavElement.svelte";
    import SidenavElements from "./SidenavElements.svelte";
    import SidenavInfo from "./SidenavInfo.svelte";

    interface SidenavProps {
        user: User;
    }

    let { user }: SidenavProps = $props();
    const links = [
        { icon: 'ic:round-dashboard', fontSize: 26, name: 'Accueil', href: '/' },
        { icon: 'fa6-solid:building-user', fontSize: 23, name: 'Stages', href: '/stages' },
        { icon: 'fa6-solid:microscope', fontSize: 26, name: 'TERs', href: '/ters' }
    ];
    const adminLinks = [
        { icon: 'fa6-solid:users', fontSize: 23, name: 'Utilisateurs', href: '/users' },
        { icon: 'fa6-solid:box-archive', fontSize: 23, name: 'Archives', href: '/archives' },
        { icon: 'fa6-solid:gear', fontSize: 23, name: 'Paramètres', href: '/settings' }
    ];
    let userAvatar = "https://c.clc2l.com/t/A/m/Among-Us-oAEaxX.png";
    let userName = user?.firstName || "John Doe";
    let userEmail = user?.email || "john.doe@example.com";

    const handleAccountAction = (event: Event) => {
        const action = event.type;
        if (action === 'logout') {
            handleLogout();
        } else if (action === 'settings') {
            window.location.href = "/settings";
        }
    };

    const handleLogout = async () => {
        await logout();
    };
</script>

<div class="flex flex-col items-center h-full w-[20%] border-light-gray border-r-[1px]">

    <div class="my-8">
        <Logo className="h-14 max-h-16 w-auto" large />
    </div>

    <SidenavElements>
        {#each links as { icon, fontSize, name, href }}
            <SidenavElement icon={icon} fontSize={fontSize} name={name} href={href} />
        {/each}
    </SidenavElements>

    <SidenavDivider className="w-[85%]" />

    {#if isAdmin(user)}
        <SidenavElements>
            <SidenavInfo title="Sudo mode" icon="fa6-solid:shield" className="w-full">
                Vous êtes connecté en tant qu'<span class="underline">administrateur</span>. Pensez à vous déconnecter lorsque vous avez terminé.
            </SidenavInfo>

            {#each adminLinks as { icon, fontSize, name, href }}
                <SidenavElement icon={icon} fontSize={fontSize} name={name} href={href} />
            {/each}
        </SidenavElements>
    {/if}

    <!-- Blank Space -->
    <div class="flex-1 w-full"></div>

    <SidenavDivider className="w-[85%] mt-4 mb-0" />

    <!-- Aperçu du compte (SidenavAccount) -->
    <SidenavElements>
        <SidenavAccount
            avatar={userAvatar}
            name={userName}
            email={userEmail}
            on:logout={handleAccountAction}
            on:settings={handleAccountAction}
        />
    </SidenavElements>
</div>
