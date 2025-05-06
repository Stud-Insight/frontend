<script lang="ts">
    import { tick } from "svelte";
    import { useId } from "bits-ui";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { browser } from "$app/environment";
    import SuperDebug from "sveltekit-superforms";

    type Status = {
        value: string;
        label: string;
    };

    const statuses: Status[] = [
        { value: "sujet1", label: "Sujet 1" },
        { value: "sujet2", label: "Sujet 2" },
        { value: "sujet3", label: "Sujet 3" },
    ];

    let openStates = $state(statuses.map(() => false));
    let values = $state(statuses.map(() => ""));
    let error = $state("");

    function closeAndFocusTrigger(triggerId: string, index: number) {
        openStates[index] = false;
        tick().then(() => {
            document.getElementById(triggerId)?.focus();
        });
    }
    
    function validateChoice() {
        const selectedValues = new Set();
        for (const val of values) {
            if (val && selectedValues.has(val)) {
                error = "Certains sujets ont été sélectionnés plusieurs fois !";
                return;
            }
            selectedValues.add(val);
        }
        error = ""; // Réinitialiser l'erreur si tout est correct
    }
    const triggerIds = statuses.map(() => useId());
</script>


<div class="grid min-w-[25vw] max-w-[40vw] items-center gap-1.5" >
    <Card.Root style="background-color: #f4f4f5;">
        <Card.Header>
            <Card.Title>Choix des sujets</Card.Title>
        </Card.Header>
        <Card.Content>
            {#each statuses as _, index}
                <div class="flex items-center space-x-4">
                    <p class="text-sm">Sujet {index + 1}</p>
                    <Popover.Root bind:open={openStates[index]}>
                        <Popover.Trigger
                            id={triggerIds[index]}
                            class={buttonVariants({
                                variant: "outline",
                                size: "sm",
                                class: "w-[150px] justify-start"
                            })}
                        >
                            {#if values[index]}
                                {statuses.find(s => s.value === values[index])?.label}
                            {:else}
                                <p class="text-muted-foreground">Sélection d'un sujet</p>
                            {/if}
                        </Popover.Trigger>
                        <Popover.Content class="w-[200px] p-0" side="right" align="start">
                            <Command.Root>
                                <Command.Input placeholder="Choisir un sujet" />
                                <Command.List>
                                    <Command.Empty>Sujet manquant !</Command.Empty>
                                    <Command.Group>
                                        {#each statuses as s}
                                            <Command.Item
                                                value={s.value}
                                                onSelect={() => {
                                                    values[index] = s.value; // Mise à jour indépendante
                                                    closeAndFocusTrigger(triggerIds[index], index);
                                                    validateChoice();
                                                }}
                                            >
                                                <span>{s.label}</span>
                                            </Command.Item>
                                        {/each}
                                    </Command.Group>
                                </Command.List>
                            </Command.Root>
                        </Popover.Content>
                    </Popover.Root>
                </div>
            {/each}
        </Card.Content>
        <Card.Footer>
            <!-- {#if browser}
                <SuperDebug data={{values}} />
            {/if} -->
            {#if error}
                <p style="color:red;">Attention ! {error}</p>
            {:else}
                <Button>Valider les choix</Button>
            {/if}
        </Card.Footer>
    </Card.Root>
</div>