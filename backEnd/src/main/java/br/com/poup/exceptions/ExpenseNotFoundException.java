package br.com.poup.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ExpenseNotFoundException extends RuntimeException{
    public ExpenseNotFoundException(String msg){super(msg);}
}
