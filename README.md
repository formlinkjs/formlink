[![Formlink](https://github.com/formlinkjs/formlink/tree/main/assets/Banner.png)](https://formlinkjs.com/)

> PLEASE DO NOT USE THIS LIBRARY IN PRODUCTION AS IT HAS MULTIPLE ISSUES THAT REQUIRE FIXING

# Formlink

![ci](https://github.com/formlinkjs/formlink/actions/workflows/ci.yml/badge.svg)

Since working with forms is so common, especially in frameworks like Vue, React, and Svelte. Formlink is a form helper library designed to help reduce the amount of boilerplate code needed for handling typical form submissions. It is designed to be framework-agnostic and can be used with any framework or library. It allows for an explicit way to set the serialization of the form data and provides a way to handle form submission errors. When uploading a file for instance, it is usual to have to convert the object into a formdata object by passing a transformer to [Axios](https://axios-http.com/docs/intro) config it's always been a lot of boilerplate code for something that could be handled by the form abstraction and so this library was born.

## API Reference

Documentation related to the API can be found [https://formlinkjs.com](https://formlinkjs.com) (not available yet).

## Installation

```bash
npm install formlink
```

## Usage

### Vue JS example

```vue
<script lang="ts" setup>
import { Form } from 'formlink';
import { reactive } from 'vue';

const props = defineProps<{ token: string; }>();

const form = reactive(new Form({
    email: '',
    password: '',
    remember: false,
}, {
    token: props.token, // Bearer token
    baseUrl: 'https://example.com/api',
}));

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post('/login', {
        onSuccess: () => window.location.href = '/dashboard',
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <form @submit.prevent="submit">
        <div>
            <InputLabel for="email" value="Email" />
            <TextInput id="email" v-model="form.email" type="email" />
            <InputError :message="form.error('email')" />
        </div>

        <div>
            <InputLabel for="password" value="Password" />
            <TextInput id="password" v-model="form.password" type="password" />
            <InputError :message="form.error('password')" />
        </div>

        <div>
            <label>
                <Checkbox v-model:checked="form.remember" name="remember" />
                <span>Remember me</span>
            </label>
        </div>

        <div>
            <button :loading="form.isProcessing()" type="submit" :class="{ 'opacity-25': form.isProcessing() }" :disabled="form.isProcessing()">
                Log in
            </button>
        </div>
    </form>
</template>
```

### React JS example

```tsx
import { Form } from 'formlink';

const token = 'Bearer token';

const form = new Form({
    email: '',
    password: '',
    remember: false,
}, {
    token,
    baseUrl: 'https://example.com/api',
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post('/login', {
        onSuccess: () => window.location.href = '/dashboard',
        onFinish: () => form.reset('password'),
    });
};

return (
    <>
        <form onSubmit={submit}>
            <div>
                <InputLabel for="email" value="Email" />
                <TextInput id="email" value={form.email} type="email" />
                <InputError message={form.error('email')} />
            </div>

            <div>
                <InputLabel for="password" value="Password" />
                <TextInput id="password" value={form.password} type="password" />
                <InputError message={form.error('password')} />
            </div>

            <div>
                <label>
                    <Checkbox value={form.remember} name="remember" />
                    <span>Remember me</span>
                </label>
            </div>

            <div>
                <button loading={form.isProcessing()} type="submit" className={ 'opacity-25': form.isProcessing() } disabled={form.isProcessing()}>
                    Log in
                </button>
            </div>
        </form>
    </>
)
```

### Svelte JS example

```svelte
<script lang="ts">
import { onMount } from 'svelte';
import { Form } from 'formlink';

let token = 'Bearer token';
let email = '';
let password = '';
let remember = false;

const form = new Form({
    email: '',
    password: '',
    remember: false,
}, {
    token,
    baseUrl: 'https://example.com/api',
});

const submit = () => {
    form.transform((data) => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post('/login', {
        onSuccess: () => (window.location.href = '/dashboard'),
        onFinish: () => form.reset('password'),
    });
};

onMount(() => {
    $: form.email = email;
    $: form.password = password;
    $: form.remember = remember;
});
</script>

<form on:submit|preventDefault={submit}>
    <div>
        <label for="email">Email</label>
        <input id="email" bind:value={email} type="email" on:input={() => (form.email = email)} />
        <div>{form.error('email')}</div>
    </div>

    <div>
        <label for="password">Password</label>
        <input id="password" bind:value={password} type="password" on:input={() => (form.password = password)} />
        <div>{form.error('password')}</div>
    </div>

    <div>
        <label>
            <input type="checkbox" bind:checked={remember} name="remember" on:change={() => (form.remember = remember)} />
            <span>Remember me</span>
        </label>
    </div>

    <div>
        <button disabled={form.isProcessing()} class:opacity-25={form.isProcessing()} type="submit">
            Log in
        </button>
    </div>
</form>
```

## Contributing

Thank you for considering contributing to the Formlink! The contribution guide can be found in this [repository](https://github.com/formlinkjs/formlink/blob/main/.github/CONTRIBUTING.md).

## Code of Conduct

In order to ensure that the FormlinkJS community is welcoming to all, please review and abide by the [Code of Conduct](https://github.com/formlinkjs/formlink#coc-ov-file).

## Security Vulnerabilities

Please review [our security policy](https://github.com/formlinkjs/formlink/security/policy) on how to report security vulnerabilities.

## License

This project is open-sourced and licensed under the [MIT license](https://opensource.org/licenses/MIT).
