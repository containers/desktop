<script lang="ts">
import PodActions from './PodActions.svelte';
import type { PodUI } from './PodUI';

export let object: PodUI;
</script>

<PodActions pod={object} dropdownMenu={true} on:update />
