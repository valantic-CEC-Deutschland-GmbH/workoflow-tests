pipeline {
    agent any
    
    environment {
        // Test configuration (other vars are inherited from Jenkins job config)
        SEMANTIC_THRESHOLD = '0.8'
        TEST_TIMEOUT = '30000'
        DOCKER_BUILDKIT = '1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                sh '''
                    echo "Creating .env file from Jenkins environment variables..."
                    cat > .env << EOF
N8N_WEBHOOK_URL=$N8N_WEBHOOK_URL
N8N_BASIC_AUTH_ENCODED=$N8N_BASIC_AUTH_ENCODED
AZURE_API_KEY=$AZURE_API_KEY
AZURE_API_HOST=$AZURE_API_HOST
AZURE_API_VERSION=$AZURE_API_VERSION
AZURE_DEPLOYMENT_NAME=$AZURE_DEPLOYMENT_NAME
OPENAI_API_KEY=$OPENAI_API_KEY
TEST_ENVIRONMENT=$TEST_ENVIRONMENT
SEMANTIC_THRESHOLD=$SEMANTIC_THRESHOLD
MAX_RETRIES=$MAX_RETRIES
TEST_TIMEOUT=$TEST_TIMEOUT
N8N_AAD_OBJECT_ID=$N8N_AAD_OBJECT_ID
N8N_TENANT_ID=$N8N_TENANT_ID
EOF
                    echo ".env file created with environment variables"
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker image..."
                    docker-compose build promptfoo-shell
                '''
            }
        }
        
        stage('Run E2E Tests') {
            steps {
                script {
                    def testExitCode = sh(
                        script: '''
                            echo "Running E2E tests..."
                            docker-compose run --rm promptfoo-shell promptfoo eval -c configs/promptfoo.config.js --no-cache -o test-results/output.html -o test-results/output.json
                        ''',
                        returnStatus: true
                    )
                    
                    // Store exit code for later use
                    env.TEST_EXIT_CODE = "${testExitCode}"
                    
                    // Always try to generate reports, even if tests fail
                    sh '''
                        echo "Test execution completed with exit code: ${TEST_EXIT_CODE}"
                        
                        # Try to generate additional report formats
                        if [ -f test-results/output.json ]; then
                            echo "JSON output generated successfully"
                        fi
                    '''
                    
                    // Archive results immediately after tests
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                    
                    // Publish HTML report if HTML Publisher plugin is installed
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                        publishHTML(target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'test-results',
                            reportFiles: 'output.html',
                            reportName: 'Promptfoo Test Report',
                            reportTitles: 'E2E Test Results'
                        ])
                    }
                    
                    // Parse JSON output to create simple test summary
                    sh '''
                        if [ -f test-results/output.json ]; then
                            echo "Test results summary:"
                            docker-compose run --rm promptfoo-shell sh -c "cat test-results/output.json | jq -r '.summary | \"Pass Rate: \\(.stats.passRate)%, Passed: \\(.stats.successes), Failed: \\(.stats.failures)\"' || echo 'Unable to parse test summary'"
                        fi
                    '''
                    
                    // Fail the build if tests failed
                    if (testExitCode != 0) {
                        error("E2E tests failed with exit code: ${testExitCode}")
                    }
                }
            }
        }
    }
    
    post {
        always {
            sh '''
                # Clean up Docker containers
                docker-compose down || true
                # Clean workspace
                rm -rf node_modules || true
                rm -f .env || true
            '''
        }
        success {
            echo 'E2E tests completed successfully!'
        }
        failure {
            echo 'E2E tests failed. Check the logs for details.'
        }
    }
}
