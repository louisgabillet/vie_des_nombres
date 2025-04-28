<script lang="ts">
import { enhance } from "$app/forms";
</script>

<h1>CONTACT</h1>
<form method="POST" action="?/contact" use:enhance>
    <label for="name">
        prénom:
        <input type="text" id="name" name="name">
    </label>
    <label for="surname">
        nom:
        <input type="text" id="surname" name="surname">
    </label>
    <label for="email">
        email:
        <input type="text" id="email" name="email">
    </label>
    <label for="mobile">
        tél (optionnel):
        <input type="text" id="mobile" name="mobile">
    </label>
    <button type="submit">envoyer</button>
</form>
