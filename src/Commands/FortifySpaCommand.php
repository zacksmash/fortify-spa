<?php

namespace Zacksmash\FortifySpa\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class FortifySpaCommand extends Command
{
    public $signature = 'fortify:spa';

    public $description = 'Install UIkit SPA preset, with views and resources';

    public function handle()
    {
        $this->publishAssets();
        $this->updateWebpackUrl();

        $this->comment('UIkit SPA is now installed.');
        $this->info('Remember to run npm i && npm run dev!');
    }

    protected function publishAssets()
    {
        $this->callSilent('vendor:publish', ['--tag' => 'fortify-spa-resources', '--force' => true]);

        $this->callSilent('vendor:publish', ['--provider' => 'Laravel\Fortify\FortifyServiceProvider']);

        $this->callSilent('vendor:publish', ['--provider' => 'Laravel\Sanctum\SanctumServiceProvider']);

        File::deleteDirectory(resource_path('css'));
    }

    protected function updateWebpackUrl()
    {
        File::put(
            base_path('webpack.mix.js'),
            str_replace(
                'http://CHANGE_ME.test',
                env('APP_URL'),
                File::get(base_path('webpack.mix.js'))
            )
        );
    }
}
