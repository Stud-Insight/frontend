<script lang="ts">
    import Icon from '@iconify/svelte';

    import * as Card from "$lib/components/ui/card/index.js";
    import Separator from '$lib/components/ui/separator/separator.svelte';
    import Input from '$lib/components/ui/input/input.svelte';

    interface DepotProps {
        id?: string;
        title:string;
        description?:string;
        closingDate?:Date;      //date de fermeture du dépôt
        extension:string;      //extensions admises
    }

    let {
        id= 'input-field-' + crypto.getRandomValues(new Uint32Array(1)),
        title,
        description,
        closingDate,
        extension,
    }: DepotProps = $props();

    let value = $state<string | undefined>();
    let files = $state<FileList | undefined>();

    let iconSize = 20;
    const today = new Date();
    let timeLeft = closingDate? (closingDate.getTime() - today.getTime()) / (1000 * 60 * 60) : 0;

</script>

<div class="grid w-full min-w-[25vw] max-w-[40vw] items-center gap-1.5">
<Card.Root>
    <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description>
            {#if closingDate}
            <p>Date de fermeture du dépôt : {closingDate.toLocaleDateString("fr-FR")}</p>
                {#if closingDate && timeLeft > 24}
                    <p>Temps restant : {Math.ceil(timeLeft/24) } jours</p>
                    {:else}
                    <p>Temps restant : {Math.ceil(timeLeft) } heures</p>
                {/if}
            {/if}
            <p>Extensions acceptées : {extension}</p>
        </Card.Description>
    </Card.Header>
    <Card.Content>
        {#if description}
        <div>
            <p>{description}</p>
        </div>
        {/if}
    </Card.Content>
    <Separator></Separator>
    <Card.Footer>
        {#if value}
        <div class="grid w-full max-w-sm items-center gap-1.5"> 
            <br> <br>
            <Icon icon={extension} font-size={iconSize} />
            <p>Document déposé : {value.split("\\").pop()}</p>
            <p>Date de la remise : {today.toLocaleDateString("fr-FR")}</p>
        </div>
        {:else}
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <br> <br>
            <Input id="file" type="file" bind:value bind:files/>
        </div>
        {/if}
    </Card.Footer>
</Card.Root>
</div>