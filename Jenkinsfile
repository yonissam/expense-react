pipeline {
environment {
registry = "yoniss/react"
registryCredential = 'dockerhub_id'
dockerImage = ''
}
    agent any
    stages{
        stage('Build docker image'){
            steps{
                script{
                   dockerImage = docker.build registry
                }
            }
        }
        stage('Push image to Hub'){
            steps{
                script{
                   docker.withRegistry( '', registryCredential ) {
                  dockerImage.push()
                }
                }
            }
        }
        stage('Deploy') {
                steps{
                script {
                    sh 'docker run -d --name expense-react -p 3000:3000 yoniss/react'
                }
                }
                }

    }
}