# Introduction

FortifySPA is an authentication starter, using Laravel Fortify and Laravel Sanctum to authenticate a VueJS SPA application with vue-auth

---

- [Installation](#installation)
- [Configuration](#configuration)

<a name="installation"></a>
## Installation

```bash
composer require zacksmash/fortify-spa
```

Next, you'll need to run the install command:

```bash
php artisan fortify:spa
```

This command will publish **FortifySPA's** views and resources.

Keep reading to configure FortifySPA.

<a name="configuration"></a>
## Configuration

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

Update the Sanctum middleware to the `api` middleware group in `app/Http/Kernel.php`

```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
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
