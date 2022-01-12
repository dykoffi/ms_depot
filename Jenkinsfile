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
                sh "docker build -t dykoffi/${APP_NAME}:${APP_VERSION} ."
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

        stage("Staging"){
            steps{
                sh 'echo staging'
            }
        }

        stage("Security tests"){
            steps{
                sh 'Deny of services'
                sh 'XSS'
                sh 'SQL injection'
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
                        sh 'cqx deploy '
                    }
                }
                stage("Deploy to AWS EC2"){ 
                    steps{
                        sh 'cqx deploy to EC2 : skip'
                    }
                }
                stage("Deploy to AWS ECS"){ 
                    steps{
                        sh 'echo deploy to ECS : skip'
                    }
                }
                stage("Deploy to AWS EKS"){ 
                    steps{
                        sh 'echo deploy to EKS : skip'
                    }
                }
                stage("Publish to AWS ECR"){ 
                    steps{
                        sh 'echo publish to ECR : skip'
                    }
                }
                stage("Publish to DockerHUB"){ 
                    steps{
                        sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                        sh "docker push dykoffi/${APP_NAME}:${APP_VERSION}"
                    }

                    post{
                        always{
                            sh 'docker logout'
                        }
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