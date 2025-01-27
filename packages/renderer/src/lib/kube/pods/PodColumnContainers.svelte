<script lang="ts">
import Dots from '../../ui/Dots.svelte';
import type { PodUI } from './PodUI';

export let object: PodUI;
</script>

<Dots containers={object.containers} />
