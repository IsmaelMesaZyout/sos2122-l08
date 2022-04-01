<script>
	import { onMount } from "svelte";
	export let name;
	let contacts = [];
	let loading = true;
	let p1;
	let p2;
	onMount(getContacts);

	async function getContacts(){
		console.log("Fetching contacts....");
		const res = await fetch("/api/v1/contacts"); //con await esperemos a que haya conectado a la api
		const data = await res.json();
		contacts = data;
		console.log("Recived contacts:" + contacts.length);
	}
</script>
<main>
	{#await contacts}
	loading
		{:then contacts}
	<table>
		<thead>
			<tr>
				<th>
					Name
					
				</th>

				<th>
					Phone
				</th>
			</tr>
			
		</thead>
		<tbody>
			{#each contacts as contact}
				<tr>
					<td>{contact.name}</td>
					<td>{contact.phone}</td>
				</tr>
			{/each}
		</tbody>
		
	</table>
	{/await}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>