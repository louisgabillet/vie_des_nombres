<script lang="ts">
import { enhance } from "$app/forms";

let { data } = $props();

const { cart } = data;
</script>

<h1>paiment</h1>
{#each cart.products as { id, quantity, product } (id)}
    <p>{ product.title } ({ quantity })</p> 
{/each}
<form 
    method="POST" 
    action="?/order" 
    use:enhance
>
    <div>
        <h3>Informations</h3>
        <label for="email">
            email:
            <input type="text" id="email" name="email">
        </label>
        <label for="surname">
            nom:
            <input type="text" id="surname" name="surname">
        </label>
        <label for="marriedName">
            nom de mariage (optionnel):
            <input type="text" id="marriedName" name="marriedName">
        </label>
        <label for="name">
            prénom:
            <input type="text" id="name" name="name">
        </label>
        <label for="middleName">
            autres prénoms (optionnel):
            <input type="text" id="middleName" name="middleName">
        </label>
        <label for="birthDate">
            date de naissance:
            <input type="text" id="birthDate" name="birthDate">
        </label>
        <label for="fatherName">
            nom du père:
            <input type="text" id="fatherName" name="fatherName">
        </label>
        <label for="motherName">
            nom de la mère:
            <input type="text" id="motherName" name="motherName">
        </label>
        <label for="description">
            parler moi de vous (optionnel):
            <textarea id="description" name="description"></textarea>
        </label>
    </div>
    <div>
        <h3>Paiement</h3>
        <label for="description">
            virement:
            <input type="radio" name="payment" value="transfer" checked>
        </label>
    </div>
    <button type="submit">ORDER</button>
</form>
