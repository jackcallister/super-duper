class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def show
    @meals = "{'meals':[{'id':1, 'name':'Sausages'}, {'id':2, 'name':'Butter Chicken'}]}"
  end
end
