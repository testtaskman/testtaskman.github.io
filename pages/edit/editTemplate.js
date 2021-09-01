import {html} from 'https://unpkg.com/lit-html?module';

export let editTemplate = (form) => html`
<section id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form id="edit-form" class="main-form pad-large" @submit=${form.editHandler}>
                        <div class="error"></div>
                        <label>Team name: <input type="text" name="name" .value="${form.value.name}"></label>
                        <label>Logo URL: <input type="text" name="logoUrl" .value="${form.value.logoUrl}"></label>
                        <label>Description: <textarea name="description" .value="${form.value.description}"></textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
                    </form>
                </article>
            </section>
`;