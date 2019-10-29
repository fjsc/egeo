@Library('libpipelines@master') _

hose {
    EMAIL = 'front'
    MODULE = 'egeo'
    DEVTIMEOUT = 30
    RELEASETIMEOUT = 30
    REPOSITORY = 'github.com/egeo'
    LANG = 'typescript'
    FOSS = true
    FORCE_AGENT = true

    DEV = { config ->

        doCompile(config)
        doUT(conf:config, agent: "ubuntu-base-ssh-1604-puppeteer")
        doPackage(config)

        parallel(QC: {
            doStaticAnalysis(config)
            doCoverallsAnalysis(config)
        }, DEPLOY: {
            doDeploy(config)
        }, failFast: config.FAILFAST)
    }
}
