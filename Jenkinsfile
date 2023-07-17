pipeline {
tools {
    nodejs 'nodejs'
  }
environment {
DOCKERHUB_USERNAME = "yoniss"
APP_NAME = "react-expense"
IMAGE_TAG = "${BUILD_NUMBER}"
IMAGE_NAME = "${DOCKERHUB_USERNAME}" + "/" + "${APP_NAME}"
registryCredential = 'dockerhub_id'
dockerImage = ''
}
    agent any
    stages{


      stage('Sonarqube Analysis'){
                                                                steps {
                                                                  script {
                                                                withSonarQubeEnv('sonarqube') {
                                                                 sh "sonar-scanner -Dsonar.projectKey=React-SonarQube -Dsonar.sources=. -Dsonar.projectName=React-SonarQube  -Dsonar.host.url=https://sonarqube.local.yetebaberut.com -Dsonar.login=sqp_1b3d308e3c223fbd9f4ac805982c743290a44ac7"
                                                                }
    															}
                                                                }
                                                            }

                                                    stage('Quality Gate'){
                                                                steps {
                                                                  script {
                                                                waitForQualityGate abortPipeline: false, credentialsId: 'jenkins-sonarqube-token'
    															}
                                                                }
                                                            }


        stage('Build docker image'){
            steps{
                script{
                   dockerImage = docker.build "${IMAGE_NAME}"
                }
            }
        }
        stage('Push image to Hub'){
            steps{
                script{
                   docker.withRegistry( '', registryCredential ) {
                  dockerImage.push("$BUILD_NUMBER")
                  dockerImage.push('latest')
                }
                }
            }
        }

        stage('Delete Docker Images from Local Docker Repo') {
                steps{
                  script{
                        sh 'docker rmi ${IMAGE_NAME}:${IMAGE_TAG}'
                        sh 'docker rmi ${IMAGE_NAME}:latest'
                  }
                }
                }


                stage('Trigger Jenkins YAML Update Pipeline'){
                           steps{
                               script{
                                    sh "curl -v -k --user yoniss:11dee7cae1810803b7e2aa51d53ed660c1 -X POST -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' --data 'IMAGE_TAG=${IMAGE_TAG}' 'http://192.168.0.139:8080/job/expense-react-argo/buildWithParameters?token=gitops-config'"
                               }
                           }
                        }

    }
}