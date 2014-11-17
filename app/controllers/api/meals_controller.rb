class API::MealsController < ApplicationController
  def index
    render json: Meal.all, each_serializer: MealSerializer, root: false
  end

  def create
    @meal = Meal.new(meal_params)

    if @meal.save
      render json: @meal
    else
      render json: { success: false }, status: 500
    end
  end

  def update
  end

  def destroy
  end

private

  def meal_params
    json_params = ActionController::Parameters.new( ActiveSupport::JSON.decode(params[:meal]) )
    json_params.permit(permitted_meal_params)
  end

  def permitted_job_params
    [:name, ingredients_attributes: [:name]]
  end
end
