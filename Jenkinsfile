pipeline{
    agent any
    environment {
        APP_NAME            = "ms_depot"
        APP_TEST_PORT       = "29100"
        DB_TEST_PORT        = "23049"
        DB_STAGING_PORT     = "54554"
        APP_VERSION         = "1.0.0"
    }
    stages{
        stage("Packages installation"){
            steps{
                sh "yarn install"
                sh "mkdir -p tests/reports"
                sh "cqx --help"
            }
        }

        stage("Create packages"){
            steps{
                sh "cqx build"
                sh "zip -r build.zip build"
            }

            post{
                always{
                    sh "rm -rdf build"
                }
                success{
                     archiveArtifacts artifacts: 'build.zip', fingerprint: true
                }
            }
        }

        stage("Security tests"){
            steps{
                sh 'echo Deny of services'
                sh 'echo XSS'
                sh 'echo SQL injection'
            }
        }

        stage("Deployment"){
            environment{
                DOCKERHUB_CREDENTIALS       = credentials('docker-hub-1')
                PLANETHOSTER_CREDENTIALS    = credentials('PLANETHOSTER_CREDENTIALS')
            }

            parallel {
                stage("Deploy to planetHoster"){ 
                    steps{
                        sh "cqx deploy \
                        -s $PLANETHOSTER_CREDENTIALS_USR@199.16.130.173:5022/home/$PLANETHOSTER_CREDENTIALS_USR/huit \
                        -p $PLANETHOSTER_CREDENTIALS_PWD \
                        --db eoiejeoeijeoifj \
                        -c 'mkdir edykoffi' \
                        -c 'touch edykoffi/test.txt' \
                        -c 'echo 'je suis la' >> edykoffi/test.txt'"
                    }
                }
            }
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}