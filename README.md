# Introduction

FortifySPA is an authentication starter, using [Laravel Fortify](https://laravel.com/docs/8.x/fortify) and [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum) to authenticate a [VueJS SPA](https://v3.vuejs.org/) with [Vue Auth](https://github.com/websanova/vue-auth)

---

- [Installation](#installation)
- [Configuration](#configuration)

<a name="installation"></a>
## Installation

Install the base package using Composer:

```bash
composer require zacksmash/fortify-spa
```

Next, you'll need to run the install command:

```bash
php artisan fortify:spa
```

This command will publish **FortifySPA's** views and resources, as well as publish Laravel Fortify and Laravel Sanctum's vendor assets.

Keep reading to configure FortifySPA.

<a name="configuration"></a>
## Configuration

Update the Sanctum middleware to the `api` middleware group in `app/Http/Kernel.php`

```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

Replace the `handle()` method in the `app/Http/Middleware/RedirectIfAuthenticated.php` file with the following:

```php
$guards = empty($guards) ? [null] : $guards;

foreach ($guards as $guard) {
    if (Auth::guard($guard)->check()) {
        if ($request->wantsJson()) {
            return response([
                'message' => 'Already Authenticated'
            ], 200);
        }

        return redirect(RouteServiceProvider::HOME);
    }
}

return $next($request);
```

Update the `app/Providers/RouteServiceProvider.php` with the following:

```php
public const HOME = '/';
```

Add the `FortifyServieProvider` to the providers array in `config/app.php`

```php
$providers => [
    ...
    App\Providers\FortifyServiceProvider::class,
]
```

Update the `config/cors.php` config file with the following:

```php
'supports_credentials' => true,
```

Update the `config/fortify.php` config file with the following:

```php
'prefix' => 'api/auth',
...
'views' => false,
```

Add the following variables to the `.env` file

```
SANCTUM_STATEFUL_DOMAINS="YOUR_DOMAIN.test:3000,YOUR_DOMAIN.test"
MIX_APP_NAME=${APP_NAME}
```

Finally, run `php artisan migrate` to create your database.

## License

**FortifyUI** is open-sourced software licensed under the [MIT license](LICENSE.md).
