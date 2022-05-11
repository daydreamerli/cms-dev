import {ArgumentsHost,Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // get context
    const response = ctx.getResponse(); // get context's response object
    const status = exception.getStatus(); // get status code

    // set error message
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: {},
      message: message,
      code: -1,
    };

    // set exception code 
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
