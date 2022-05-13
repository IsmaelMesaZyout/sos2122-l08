<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	
	let contacts = [];
	let newContact = {
		name: "",
		phone:"",
		email:""
	}
	let loading = true;
	onMount(getContacts);

	async function getContacts(){
		console.log("Fetching contacts....");
		const res = await fetch("https://sos2122-imz.herokuapp.com/#/contactList"); //con await esperemos a que haya conectado a la api
		if(res.ok){
			const data = await res.json();
			contacts = data;
			console.log("Recived contacts:" + contacts.length);
		}
	}

	async function insertContact(){
		console.log("Inserting contacts...." +JSON.stringify(newContact));
		const res = await fetch("/api/v1/contacts",
			{
				method:"POST",
				body: JSON.stringify(newContact),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function(res){
				getContacts();
			}); //con await esperemos a que haya conectado a la api
	}
	
</script>
<main>
	{#await contacts}
	loading
		{:then contacts}
	<Table bordered>
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Phone</th>
				<th>Actions</th>
			</tr>
			
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newContact.name}"></td>
				<td><input bind:value="{newContact.email}"></td>
				<td><input bind:value="{newContact.phone}"></td>
				<td><Button 
					outline 
					color="primary"
					on:click="{insertContact}">insert</Button></td>
			</tr>
			{#each contacts as contact}
				<tr>
					<td><a href="#/contact/{contact.name}">{contact.name}</a></td>
					<td>{contact.email}</td>
					<td>{contact.phone}</td>
				</tr>
			{/each}
		</tbody>
		
	</Table>
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