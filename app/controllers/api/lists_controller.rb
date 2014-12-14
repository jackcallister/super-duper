class API::ListsController < ApplicationController
  def create
    List.new(meal_ids: params[:meal_ids], user: current_user)
    render json: { success: true }
  end
end
