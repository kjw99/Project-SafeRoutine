pipeline {
    agent any

    tools{
      nodejs 'nodeJS'
      gradle 'gradle'
    }
    environment {
        imagename = "saferoutine"
    //     registryCredential = 'Docker Hub Credential ID'
        dockerImage = ''
    }

    stages {
        stage('Prepare') {
          steps {
            echo 'Clonning Repository'
            git url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B102.git',
              branch: 'release-1.0',
              credentialsId: 'GitLab_Token'
            }
        }
        stage('Build Front') {
          steps{
            echo 'Build front'
            dir('./FE_SafeRoutine/SafeRoutine'){
              sh 'apt-get update && apt-get upgrade -y'
              sh 'npm install'
              sh 'npm run build'
            }
          }
        }
        stage('Bulid Back') {
          steps {
            echo 'Bulid Back'
            dir('./BE_SafeRoutine'){
                sh 'ls'
                sh 'chmod 755 gradlew'
                sh './gradlew clean'
                sh './gradlew build'
            }
          }
        }

        stage('deploy'){
          steps{
            sh 'sudo docker-compose up -d --build'
          }
        }
        // stage('Bulid Docker') {
        //   steps {
        //     echo 'Bulid Docker'
        //     script {
        //         dockerImage = docker.build imagename
        //     }
        //   }
        // }

    //     stage('Push Docker') {
    //       steps {
    //         echo 'Push Docker'
    //         script {
    //             docker.withRegistry( '', registryCredential) {
    //                 dockerImage.push() 
    //             }
    //         }
    //       }
    //       post {
    //         failure {
    //           error 'This pipeline stops here...'
    //         }
    //       }
    //     }
        
    //     stage('Docker Run') {
    //         steps {
    //             echo 'Pull Docker Image & Docker Image Run'
    //             sshagent (credentials: ['	saferoutine']) {
    //                 sh "ssh -o StrictHostKeyChecking=no ubuntu@172.26.0.163 'docker pull saferoutine'" 
    //                 sh "ssh -o StrictHostKeyChecking=no ubuntu@172.26.0.163 'docker ps -q --filter name=saferoutine | grep -q . && docker rm -f \$(docker ps -aq --filter name=saferoutine)'"
    //                 sh "ssh -o StrictHostKeyChecking=no ubuntu@172.26.0.163 'docker run -d --name saferoutine -p 8080:8080 saferoutine'"
    //             }
    //         }
    //     }
    // }
    // post {
    //     success {
    //         slackSend (channel: '#채널명', color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    //     }
    //     failure {
    //         slackSend (channel: '#채널명', color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    //     }
    }
}