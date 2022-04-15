<script>
    import { onMount } from "svelte";


    export let params = {};
    import { pop } from "svelte-spa-router";
    import { Button } from "sveltestrap";
	import Table from "sveltestrap/src/Table.svelte";

    onMount(getContact);

    let contact = {};
    
    let newContact = {
		name: "",
		phone:"",
		email:""
	};

    let updatedName;
    let updatedPhone;
    let updatedEmail;
    async function getContact(){
		console.log("Fetching contacts....");
		const res = await fetch("/api/v1/contacts/" + params.contactName); //con await esperemos a que haya conectado a la api
		if(res.ok){
			const data = await res.json();
			contact = data;
            updatedName = contact.name;
            updatedPhone = contact.phone;
            updatedEmail = contact.email;
			console.log("Recived contact.");
		}
	}

    async function editContact(){
        console.log("Inserting contacts...." +JSON.stringify(newContact));
		const res = await fetch("/api/v1/contacts",
			{
				method:"PUT",
				body: JSON.stringify(newContact),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function(res){
				getContact();
			});
    }
</script>

<main>

    This is the view of Contact {params.contactName};
        {#await contact}
        loading
            {:then contact}
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
                    <td><input bind:value="{updatedName}"></td>
                    <td><input bind:value="{updatedEmail}"></td>
                    <td><input bind:value="{updatedPhone}"></td>
                    <td><Button 
                        outline 
                        color="primary"
                        on:click="{editContact}">Edit</Button></td>
                </tr>
            </tbody>
            
        </Table>
        {/await}
        <Button outline color="secondary" on:click="{pop}">Back</Button>
    </main>