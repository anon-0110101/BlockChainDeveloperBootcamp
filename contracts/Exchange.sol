//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    
    mapping(address => mapping(address => uint256)) public tokens;

    //Orders Mapping - tokenGet & the amountGet, tokenGive & amountGive
    mapping(uint256 => _Order) public orders;
    uint256 public orderCount;



    event Deposit(
        address token, 
        address user, 
        uint256 amount, 
        uint256 balance);
    
    event Withdraw(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );
    event Order (
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet, 
        address tokenGive,
        uint256 amountGive, 
        uint256 timestamp
    );
    //way to model the order
    struct _Order {
        //Attributes of the orders -
        uint256 id; // unique identifier for the order
        address user; // address of the user who made the order
        address tokenGet; //the address of the tokenGet
        uint256 amountGet; //amount of tokenGet
        address tokenGive; // the address of the tokenGive
        uint256 amountGive; //amount of the tokenGive
        uint256 timestamp; //when order was created
    }
    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    // ------------------------
    // DEPOSIT & WITHDRAW TOKEN
    
    function depositToken(address _token, uint256 _amount) public {
        
        //Transfer tokens for exchange 
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        
        //update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

        //emit an event
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);

    }

    function withdrawToken(address _token, uint256 _amount) public {
        //ensure user has enough tokens to withdraw
        require(tokens[_token][msg.sender] >= _amount);

        //update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;

        //transfer token to the user
        Token(_token).transfer(msg.sender, _amount);

        //emit an event
        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }


    // check balances
    function balanceOf(address _token, address _user)
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }

    //----------------------
    //MAKE AND CANCEL ORDERS

    //tokenGive - (the token they want to spend) which token and how much
    //tokenGet - (the token they want to receive) which token and how much


    function makeOrder(
        address _tokenGet, 
        uint256 _amountGet, 
        address _tokenGive, 
        uint256 _amountGive
    ) public {
        require(balanceOf(_tokenGive, msg.sender) >= _amountGive);


        orderCount = orderCount + 1;
        orders[orderCount] = _Order(
            orderCount, // ID 
            msg.sender, // user
            _tokenGet, // tokenGet
            _amountGet, // amountGet
            _tokenGive, // tokenGive
            _amountGive, // amountGive
            block.timestamp //current  timestamp
        );

        //Emit event
            emit Order(
                orderCount, 
                msg.sender, 
                _tokenGet, 
                _amountGet,
                _tokenGive,
                _amountGive,
                block.timestamp
            );

        //require token balance before making orders
    }


}