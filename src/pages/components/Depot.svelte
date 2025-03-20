<script lang="ts">
    import Depot from '$components/depot/Depot.svelte';
    import Icon from '@iconify/svelte';

    let date: Date = new Date('2025-03-25');
    let description = "Ceci est un premier jet pour un dépôt. Un super dépôt !";
</script>

<Depot title="Premier depot" closingDate={date} extension="PDF" description={description}/>
