pipeline {
  agent {
    docker {
      image 'node:10.16'
    }
  }
  options {
    timeout(10) 
  }
  triggers {
      githubPush()
  }
  environment {
      SERVICE_NAME = 'mfl-be'
      DEV_IP = "54.177.202.199"
      STAGE_IP = "13.56.135.55"
      SSH_AGENT = "mifa-california-ssh"
      ARTIFACT_NAME = "${env.SERVICE_NAME}#${env.BRANCH_NAME}#${env.BUILD_NUMBER}"
      EMAIL_TO_SEND_CC_DEV = "nikunjmavani.albetrios@gmail.com"
      EMAIL_TO_SEND_CC_PROD = "nikunjmavani.albetrios@gmail.com"
  }

  stages {
    stage('Build') {
      steps {
        script {
          sh 'npm -v'
          sh 'node -v'
          sh 'npm install'
        }
      }
    }

    stage('Package') {
      steps {
        dir("${env.REPO_DIR}") {
          withAWS(region:'us-west-1', credentials:'jenkins-mathfactlabs') {
            s3Download(file:'.env', bucket:'env.mathfactlabs', path:"mfl-be/${env.BRANCH_NAME}/.env", force:true)
          }
          sh "mkdir -p tmp"
          sh "tar --exclude='./tmp' -czf ${env.WORKSPACE}/tmp/${env.ARTIFACT_NAME}.tar.gz ."
          sh "mv ${env.WORKSPACE}/tmp/${env.ARTIFACT_NAME}.tar.gz ${env.WORKSPACE}"
        }
      }
    }

    stage('Deploy'){
      steps{
        script {
          if (env.BRANCH_NAME == 'development') {
            sshagent(["${SSH_AGENT}"]) {
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${DEV_IP} 'bash -s' < ./pre-deploy.sh ${env.SERVICE_NAME}-development"
              sh "scp -o StrictHostKeyChecking=no ${env.WORKSPACE}/${env.ARTIFACT_NAME}.tar.gz ubuntu@${DEV_IP}:/home/ubuntu/.tmp/builds/${env.SERVICE_NAME}-development"
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${DEV_IP} 'bash -s' < ./deploy.sh ${env.SERVICE_NAME}-development ${env.ARTIFACT_NAME}"
            }
          }
          if (env.BRANCH_NAME == 'staging') {
            sshagent(["${SSH_AGENT}"]) {
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_IP} 'bash -s' < ./pre-deploy.sh ${env.SERVICE_NAME}-staging"
              sh "scp -o StrictHostKeyChecking=no ${env.WORKSPACE}/${env.ARTIFACT_NAME}.tar.gz ubuntu@${STAGE_IP}:/home/ubuntu/.tmp/builds/${env.SERVICE_NAME}-staging"
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_IP} 'bash -s' < ./deploy.sh ${env.SERVICE_NAME}-staging ${env.ARTIFACT_NAME}"
            }
          }
          if (env.BRANCH_NAME == 'main') {
            sshagent(["${SSH_AGENT}"]) {
              sh "echo NO OP"
            }
          }
        }
      }
    }
  }
  post {
    always {
      cleanWs()
    }
    // Triggering Mails
    success {  
      script {
        if (env.BRANCH_NAME == 'development') {
          mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Success</h3><br>", charset: 'UTF-8', from: 'jenkins@mathfactlabs.com', mimeType: 'text/html', replyTo: '', subject: "SUCCESS CI: Project name -> ${env.JOB_NAME}", to: "${env.EMAIL_TO_SEND_CC_DEV}";
        }
        if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'staging') {
          mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Success</h3><br>", charset: 'UTF-8', from: 'jenkins@mathfactlabs.com', mimeType: 'text/html', replyTo: '', subject: "SUCCESS CI: Project name -> ${env.JOB_NAME}", to: "${env.EMAIL_TO_SEND_CC_PROD}";
        }
      }
    }  
    
    failure {  
      script {
        if (env.BRANCH_NAME == 'development') {
          mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Error</h3><br>", charset: 'UTF-8', from: 'jenkins@mathfactlabs.com', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "${env.EMAIL_TO_SEND_CC_DEV}";  
        }
        if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'staging') {
          mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Error</h3><br>", charset: 'UTF-8', from: 'jenkins@mathfactlabs.com', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "${env.EMAIL_TO_SEND_CC_PROD}";  
        }  
      }  
    }
  }
}
