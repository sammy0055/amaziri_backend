resource "aws_iam_role" "iam_for_lambda" {
  name               = "${var.projectname}_iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Attach CloudWatch policy to IAM role
resource "aws_iam_role_policy" "cloudwatch_policy" {
  name   = "cloudwatch_lambda_policy"
  role   = aws_iam_role.iam_for_lambda.id
  policy = data.aws_iam_policy_document.cloudwatch_policy.json
}

resource "aws_lambda_function" "test_lambda" {
  filename      = "lambda_function_payload.zip"
  function_name = "${var.projectname}_lambda"
  description   = "a test function for practice"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "dist/lambdaHandler.handler"
  runtime       = "nodejs20.x"
  timeout       = 5
  memory_size   = 500
  source_code_hash = data.archive_file.lambda.output_base64sha256
}



resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.test_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "${aws_api_gateway_rest_api.api_gateway.execution_arn}/*/*"

  depends_on = [aws_api_gateway_rest_api.api_gateway]
}

