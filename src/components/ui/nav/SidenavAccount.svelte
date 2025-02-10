<script lang="ts">
    import Icon from "@iconify/svelte";
import { createEventDispatcher } from "svelte";

    export let avatar: string;
    export let name: string;
    export let email: string;

    // Déclarez une interface pour les événements
    interface SidenavAccountEvents {
        logout: void; // Aucun paramètre pour cet événement
        settings: void; // Aucun paramètre pour cet événement
    }

    // Utilisez cette interface pour le typage
    const dispatch = createEventDispatcher<SidenavAccountEvents>();

    let dropdownOpen = false;

    const toggleDropdown = () => {
        dropdownOpen = !dropdownOpen;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleDropdown();
        }
    };

    const handleLogout = () => {
        dispatch('logout');
    };

    const handleSettings = () => {
        dispatch('settings');
    };
</script>

<div class="flex flex-col items-center w-full relative">
    <!-- Aperçu du compte -->
    <button
        type="button"
        class="flex items-center gap-3 w-full p-4 cursor-pointer hover:bg-gray-100 transition duration-200"
        on:click={toggleDropdown}
        on:keydown={handleKeyDown}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
    >
        <img 
            src={avatar} 
            alt="Avatar" 
            class="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
        />
        <div class="flex flex-col text-left">
            <span class="font-semibold text-gray-800">{name}</span>
            <span class="text-sm text-gray-500">{email}</span>
        </div>
    </button>

    <!-- Menu déroulant -->
    <div 
    class={`absolute bottom-full right-0 mb-2 bg-white shadow-lg rounded-lg overflow-hidden transition transform origin-bottom-right 
        ${dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`} 
    style="min-width: 200px;"
    >
        <button 
            type="button"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
            on:click={handleSettings}
        >
            Paramètres
        </button>
        <button 
            type="button"
            class="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition duration-200"
            on:click={handleLogout}
        >
            <Icon icon="" /> Se déconnecter
        </button>
    </div>
</div>
