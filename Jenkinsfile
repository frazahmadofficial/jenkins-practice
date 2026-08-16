pipeline {
    agent any

    stages {
        stage('Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                sh 'node dist/app.js'
                sh 'ls -l dist/app.js'
            }
        }

        stage('Secret Check') {
            steps {
                withCredentials([string(credentialsId: 'demo-secret', variable: 'DEMO_SECRET')]) {
                    sh 'test -n "$DEMO_SECRET"'
                    echo 'Secret loaded securely without displaying it.'
                }
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
                echo 'Build artifact archived successfully.'
            }
        }

        stage('Deploy') {
            steps {
                sh 'mkdir -p /var/lib/jenkins/deployments/jenkins-practice/releases/$BUILD_NUMBER'
                sh 'cp dist/app.js /var/lib/jenkins/deployments/jenkins-practice/releases/$BUILD_NUMBER/app.js'
                sh 'ln -sfn /var/lib/jenkins/deployments/jenkins-practice/releases/$BUILD_NUMBER /var/lib/jenkins/deployments/jenkins-practice/current'
                sh 'node /var/lib/jenkins/deployments/jenkins-practice/current/app.js'
                echo "Build #${env.BUILD_NUMBER} deployed locally."
            }
        }
    }

    post {
        success {
            echo 'Node.js CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'Node.js CI/CD pipeline failed. Check Console Output.'
        }
    }
}
